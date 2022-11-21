import {
  dateTextColor,
  incomeTextColor,
  outcomeTextColor,
} from "../constants/colors";

export default function Transaction(props) {
  const { type, date, description, value } = props;
  return (
    <>
      <span color={dateTextColor}>{date}</span>
      <span>{description}</span>
      <span color={type === "deposit" ? incomeTextColor : outcomeTextColor}>
        {value}
      </span>
    </>
  );
}
