import { formatDate } from "@/app/_libs/utils";
import styles from "./index.module.css";

type Props = {
  date: string;
};

export default function Date({ date }: Props) {
  return <span>{formatDate(date)}</span>;
}
