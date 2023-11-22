export interface ToggleProps {
  active: boolean;
  title: string;
  name: string;
  id?: number;
  type: "delete" | "save" | "" | "change";
}

export interface ErrorPopUpType {
  active: boolean;
  message: string;
}
