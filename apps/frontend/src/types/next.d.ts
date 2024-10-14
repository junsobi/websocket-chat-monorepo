import { NextPage } from "next";
import { ReactNode } from "react";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};
