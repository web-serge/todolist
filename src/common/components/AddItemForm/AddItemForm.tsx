import { unwrapResult } from "@reduxjs/toolkit";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FormHelperText } from "@mui/material";
import { BaseResponseType } from "../../types";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

type Props = {
  addItem: (title: string) => Promise<any>
  disabled?: boolean
  placeholder?: string
}

export const AddItemForm = React.memo(function({ addItem, disabled = false, placeholder = "" }: Props) {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title)
        .then(unwrapResult)
        .then(() => {
          setTitle("");
        })
        .catch((err: BaseResponseType) => {
          if (err?.resultCode) {
            setError(err.messages[0]);
          }
        });
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      addItemHandler();
    }
  };

  return (
    <>
      <FormControl sx={{ m: 1, width: "100%"}} variant="outlined" >
        <InputLabel>{placeholder}</InputLabel>
        <Input
          disabled={disabled}
          error={!!error}
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={addItemHandler}
              >
                < AddBoxOutlinedIcon color={error ? "error" : "primary"} />
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText sx={{ color: "red" }}>{error ? error : ' '}</FormHelperText>
      </FormControl>
    </>
  );
});
