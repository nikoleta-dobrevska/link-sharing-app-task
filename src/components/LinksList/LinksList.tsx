import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { LinksField } from "@/components/LinksField";
import { NoLinksDescription } from "@/components/NoLinksDescription";
import { Button } from "@/components/ui/Button";
import { queryClient } from "@/config/react-query";
import { linksSchema } from "@/schemas";
import { createOrUpdateUserLinks } from "@/services/createOrUpdateLinks";
import { deleteLink } from "@/services/deleteLink";
import { fetchAllLinkProviders } from "@/services/fetchAllLinkProviders";
import { fetchAllLinks } from "@/services/fetchAllLinks";
import { type LinksFormData } from "@/types";

import linksListClasses from "./LinksList.module.scss";

export const LinksList = () => {
  const [showDescription, setShowDescription] = useState(true);

  const { data: linkProviders } = useQuery({
    queryKey: ["linkProviders"],
    queryFn: fetchAllLinkProviders,
  });

  const { data: userLinks } = useQuery({
    queryKey: ["links"],
    queryFn: fetchAllLinks,
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LinksFormData>({
    resolver: zodResolver(linksSchema),
    values: {
      links:
        useMemo(
          () =>
            userLinks &&
            linkProviders &&
            userLinks?.map((link) => {
              const provider = linkProviders?.[link.linkProviderId - 1];

              return {
                linkProvider: provider,
                link: link.link,
              };
            }),
          [userLinks, linkProviders]
        ) ?? [],
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { fields, append } = useFieldArray({
    control,
    name: "links",
  });

  const createOrUpdateUserLinksMutation = useMutation({
    mutationFn: createOrUpdateUserLinks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  const deleteLinkMutation = useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  const onSubmit = (data: LinksFormData) => {
    createOrUpdateUserLinksMutation.mutate(data);
  };

  return (
    <div>
      <Button
        type="button"
        variant="secondary"
        size="md"
        onClick={() => {
          setShowDescription(false);
          if (linkProviders) {
            append({ linkProvider: linkProviders[0], link: "" });
          }
        }}
      >
        <span aria-hidden={true}>+</span> Add new link
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        {linkProviders &&
          fields.map((field, index) => (
            <LinksField
              key={field.id}
              index={index}
              errorMessage={errors?.links?.[index]?.link?.message}
              control={control}
              linkProviders={linkProviders}
              register={register}
              deleteLinkMutation={deleteLinkMutation}
              field={field}
            />
          ))}
        {userLinks && userLinks?.length <= 0 && showDescription && (
          <NoLinksDescription />
        )}
        <span
          className={
            linksListClasses["page-layout__links-section__layout__separator"]
          }
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={showDescription && userLinks && userLinks?.length <= 0}
        >
          Save
        </Button>
      </form>
    </div>
  );
};
