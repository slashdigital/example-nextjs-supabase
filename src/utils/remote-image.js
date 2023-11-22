import { supabaseImageStorageURL } from "@/constants/constant";

export const getRemoteImageUrl = (supabaseFilePath, supabaseFileName) => {
  return `${supabaseImageStorageURL}/${supabaseFilePath}/${supabaseFileName}`;
};
