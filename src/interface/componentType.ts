export interface ToggleProps {
  active: boolean;
  title: string;
  name: string;
  id?: number;
  type: "delete" | "save" | "" | "change";
}

export interface ErrorPopUp {
  active: boolean;
  message: string;
}
