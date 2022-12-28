import { HttpError } from "@pankod/refine-core";
import {
  Edit,
  Box,
  TextField,
  Autocomplete,
  useAutocomplete,
} from "@pankod/refine-mui";
import { Controller, useForm } from "@pankod/refine-react-hook-form";

import { ICategory, IPost } from "../../interfaces";

export const PostEdit: React.FC = () => {
  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useForm<IPost, HttpError, IPost & { category: ICategory }>();

  const { autocompleteProps } = useAutocomplete<ICategory>({
    resource: "categories",
    defaultValue: queryResult?.data?.data.category.id,
    queryOptions: { enabled: !!queryResult?.data?.data.category.id },
  });

  return (
      <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
        <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column" }}
            autoComplete="off"
        >
          <TextField
              {...register("title", { required: "Title is required" })}
              error={!!errors?.title}
              helperText={errors.title?.message}
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              defaultValue={" "}
              autoFocus
          />
          <Controller
              control={control}
              name="status"
              rules={{ required: "Status is required" }}
              defaultValue={null as any}
              render={({ field }) => (
                  <Autocomplete
                      {...field}
                      options={["published", "draft", "rejected"]}
                      onChange={(_, value) => {
                        field.onChange(value);
                      }}
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              label="status"
                              margin="normal"
                              variant="outlined"
                              error={!!errors.status}
                              helperText={errors.status?.message}
                              required
                          />
                      )}
                  />
              )}
          />
          <Controller
              control={control}
              name="category"
              rules={{ required: "Category is required" }}
              defaultValue={null as any}
              render={({ field }) => (
                  <Autocomplete
                      {...autocompleteProps}
                      {...field}
                      onChange={(_, value) => {
                        field.onChange(value);
                      }}
                      getOptionLabel={(item) => {
                        return item.title
                            ? item.title
                            : autocompleteProps?.options?.find(
                            (p) =>
                                p.id.toString() ===
                                item.toString(),
                        )?.title ?? "";
                      }}
                      isOptionEqualToValue={(option, value) =>
                          value === undefined ||
                          option.id.toString() === value.toString()
                      }
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              label="Category"
                              margin="normal"
                              variant="outlined"
                              error={!!errors.category}
                              helperText={errors.category?.message}
                              required
                          />
                      )}
                  />
              )}
          />
        </Box>
      </Edit>
  );
};
