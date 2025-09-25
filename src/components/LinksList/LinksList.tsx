import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import LinksIcon from "@/assets/svgr/links.svg?react";
import PhoneIcon from "@/assets/svgr/Phone.svg?react";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/Button";
import { DropDownField } from "@/components/ui/form/DropDownField";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { queryClient } from "@/config/react-query";
import { linksSchema } from "@/schemas";
import { createOrUpdateUserLinks } from "@/services/createOrUpdateLinks";
import { deleteLink } from "@/services/deleteLink";
import { fetchAllLinkProviders } from "@/services/fetchAllLinkProviders";
import { fetchAllLinks } from "@/services/fetchAllLinks";
import { type LinksFormData } from "@/types";

import linksListClasses from "./LinksList.module.scss";
import inputClasses from "@/components/ui/form/Input/Input.module.scss";

export const LinksList = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LinksFormData>({
    resolver: zodResolver(linksSchema),
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    control,
    name: "links",
  });

  const fetchAllLinkProvidersQuery = useQuery({
    queryKey: ["linkProviders"],
    queryFn: fetchAllLinkProviders,
  });

  const fetchAllUserLinksQuery = useQuery({
    queryKey: ["links"],
    queryFn: fetchAllLinks,
  });

  type linkProvider = {
    id: number;
    iconName: string;
    src: string;
    name: string;
    backgroundColor: string;
    textColor: string;
    allowedDomains: string[];
  };

  const linkProviders = fetchAllLinkProvidersQuery?.data?.map(
    (linkProviders: linkProvider) => ({
      id: linkProviders.id,
      iconName: linkProviders.iconName,
      src: `${import.meta.env.VITE_API_URL}/static/icons/${linkProviders.iconName}`,
      name: linkProviders.name,
      value: linkProviders.name,
      backgroundColor: linkProviders.backgroundColor,
      textColor: linkProviders.textColor,
      allowedDomains: linkProviders.allowedDomains,
    })
  );

  const createOrUpdateUserLinksMutation = useMutation({
    mutationFn: createOrUpdateUserLinks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  const deleteLinkMutation = useMutation({
    mutationFn: (linkProviderId: number) => deleteLink(linkProviderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  const onSubmit = (data: LinksFormData) => {
    createOrUpdateUserLinksMutation.mutate(data);
  };

  return (
    <div>
      <div>
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={() => append({ linkProvider: linkProviders[0], link: "" })}
        >
          <span aria-hidden={true}>+</span> Add new link
        </Button>

        <form onSubmit={handleSubmit(onSubmit)}>
          {fetchAllLinkProvidersQuery?.data &&
          fetchAllUserLinksQuery?.data?.length > 0 ? (
            fields.map((field, index) => (
              <div key={field.id}>
                <button
                  type="button"
                  onClick={() => deleteLinkMutation.mutate(index)}
                >
                  Remove
                </button>

                <Label color="dark-gray">Platform</Label>
                <FormField>
                  <Controller
                    control={control}
                    name={`links.${index}.linkProvider`}
                    rules={{ required: "true" }}
                    render={({ field: { onChange } }) => (
                      <DropDownField
                        onChange={onChange}
                        options={linkProviders}
                        placeholder="Choose platform"
                      />
                    )}
                  />
                </FormField>
                <Label color="dark-gray" htmlFor="">
                  Link {index + 1}
                </Label>
                <FormField
                  icon={<LinksIcon />}
                  errorMessage={errors?.links?.[index]?.link?.message}
                >
                  <Input
                    {...register(`links.${index}.link`)}
                    aria-required="true"
                    aria-invalid={!!errors?.links?.[index]?.link}
                    className={
                      errors?.links?.[index]?.link
                        ? inputClasses["form__input--invalid"]
                        : inputClasses["form__input--valid"]
                    }
                    type="text"
                    placeholder="e.g. https://www.github.com/johnappleseed"
                  />
                </FormField>
              </div>
            ))
          ) : (
            <div
              className={
                linksListClasses[
                  "page-layout__links-section__layout__links__group"
                ]
              }
            >
              <PhoneIcon />
              <Typography component="h2" variant="heading" size="md">
                Let's get you started
              </Typography>
              <Typography
                component="p"
                variant="body"
                size="md"
                className={
                  linksListClasses[
                    "page-layout__links-section__layout__links__group__p"
                  ]
                }
              >
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We’re here to help
                you share your profiles with everyone!
              </Typography>
            </div>
          )}
          <span
            className={
              linksListClasses["page-layout__links-section__layout__separator"]
            }
          />
          <div
            className={
              linksListClasses["page-layout__links-section__layout__save-btn"]
            }
          >
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!!fetchAllUserLinksQuery?.data}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
