import { CiViewColumn } from "react-icons/ci";
import { TfiText } from "react-icons/tfi";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { GoCircle } from "react-icons/go";

export const menuPanels = [
  {
    key: "circle",
    label: "Circle",
    icon: <GoCircle size={40} />,
    isMore: true,
  },
  {
    key: "column",
    label: "Column",
    icon: <CiViewColumn size={40} />,
    isMore: false,
  },
  {
    key: "text",
    label: "Text",
    icon: <TfiText size={30} />,
    isMore: false,
  },
  {
    key: "comment",
    label: "Comment",
    icon: <FaRegComment size={30} />,
    isMore: false,
  },
  {
    key: "emoji",
    label: "Emoji",
    icon: <MdOutlineEmojiEmotions size={30} />,
    isMore: false,
  },
];
