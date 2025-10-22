import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useFieldArray, useForm } from "react-hook-form";

import { EmptyLinksList } from "@/components/links/EmptyLinksList";
import { LinksField } from "@/components/links/LinksField";
import { Button } from "@/components/ui/Button";
import { queryClient } from "@/config/react-query";
import {
  useAuthenticatedUserProfileDataQuery,
  useLinkProvidersQuery,
  useUserLinksQuery,
} from "@/queries";
import { linksSchema } from "@/schemas";
import { createOrUpdateUserLinks } from "@/services/createOrUpdateLinks";
import { deleteLink } from "@/services/deleteLink";
import { type LinksFormData } from "@/types";

import linksListClasses from "./LinksList.module.scss";

export const LinksList = () => {
  const { data: linkProviders } = useLinkProvidersQuery();
  const { data: userLinks } = useUserLinksQuery();
  const { data: authenticatedUserProfileData } =
    useAuthenticatedUserProfileDataQuery();

  const initialFormValues = useMemo(
    () => ({
      links:
        (userLinks &&
          linkProviders &&
          userLinks?.map((link) => {
            const provider = linkProviders?.[link.linkProviderId - 1];

            return {
              linkProvider: provider,
              link: link.link,
            };
          })) ??
        [],
    }),
    [userLinks, linkProviders]
  );

  const userId = authenticatedUserProfileData?.id;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(linksSchema),
    values: initialFormValues,
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const { fields, append, remove, update, swap } = useFieldArray({
    control,
    name: "links",
  });

  const createOrUpdateUserLinksMutation = useMutation({
    mutationFn: createOrUpdateUserLinks,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["links"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["publicUserProfileData", userId],
      });
    },
  });

  const deleteLinkMutation = useMutation({
    mutationFn: deleteLink,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["links"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["publicUserProfileData", userId],
      });
    },
  });

  const onSubmit = (data: LinksFormData) => {
    userLinks?.forEach((userLink) => {
      const isNotEdited = data.links.some(
        (d) =>
          d.linkProvider.id === userLink.linkProviderId &&
          d.link === userLink.link
      );

      if (!isNotEdited) {
        update(userLink.order, data.links[userLink.order]);
        deleteLinkMutation.mutate(userLink.linkProviderId);
      }
    });

    createOrUpdateUserLinksMutation.mutate(data);
  };

  const onSwap = (from: number, to: number) => {
    swap(from, to);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={linksListClasses["links-list"]}>
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={() => {
            if (linkProviders) {
              append({ linkProvider: linkProviders[0], link: "" });
            }
          }}
          className={linksListClasses["links-list__add-btn"]}
        >
          <span aria-hidden={true}>+</span> Add new link
        </Button>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={linksListClasses["links-list__form"]}
        >
          {userLinks && userLinks?.length <= 0 ? (
            <EmptyLinksList />
          ) : (
            <div className={linksListClasses["links-list__fields"]}>
              {linkProviders &&
                fields.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <LinksField
                        index={index}
                        errorMessage={errors?.links?.[index]?.link?.message}
                        control={control}
                        linkProviders={linkProviders}
                        register={register}
                        onRemove={() => {
                          remove(index);

                          const hasBeenAdded = userLinks?.some(
                            (link) => link.link === field.link
                          );

                          if (hasBeenAdded) {
                            deleteLinkMutation.mutate(field.linkProvider.id);
                          }
                        }}
                        swapLink={onSwap}
                      />
                    </div>
                  );
                })}
            </div>
          )}
          <span className={linksListClasses["links-list__separator"]} />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={userLinks && userLinks?.length <= 0}
            className={linksListClasses["links-list__save-btn"]}
          >
            Save
          </Button>
        </form>
      </div>
    </DndProvider>
  );
};
