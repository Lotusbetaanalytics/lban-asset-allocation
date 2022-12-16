import { WebPartContext } from "@microsoft/sp-webpart-base";
import { PageContext } from "@microsoft/sp-page-context";

export interface IAssetAllocationProps {
  description: string;
  isOM: boolean;
  isEM: boolean;
  isHR: boolean;
  context: WebPartContext;
  pageContext: PageContext;
}
