import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IImage, IUser } from "../../types";
import Avatar from "@mui/material/Avatar";
import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { publicRequest } from "../../utils/requestMethod";

interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function MuiTab({ members }: { members: IUser[] }) {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [roomId, setRoomId] = useState("");
  const [mediaImage, setMediaImage] = useState<IImage[]>([]);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    setRoomId(window.location.href.split("/")[5]);
  }, [window.location.href]);
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  useEffect(() => {
    const getImages = async () => {
      try {
        await publicRequest
          .get("/image/get_all_images_from_room", {
            params: {
              roomId,
            },
          })
          .then((response) => setMediaImage(response.data.docs));
      } catch (error) {
        console.log(error);
      }
    };
    if (roomId !== "") {
      getImages();
    }
  }, [roomId]);
  return (
    <Box>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          className="text-black bg-white dark:text-white dark:bg-dark-dark"
        >
          <Tab label="Members" {...a11yProps(0)} />
          <Tab label="Media" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {members.map((item, index) => (
            <div
              key={item._id}
              className="flex w-full gap-4 p-2 rounded-lg dark:hover:bg-dark-item-hover"
            >
              <div className="dark:text-gray-sm">
                <Avatar children={item.username?.charAt(0)} />
              </div>
              <div>
                <h4 className="font-medium">{item.username}</h4>
                <span className="text-sm dark:text-gray-sm">online</span>
              </div>
            </div>
          ))}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className="grid w-full grid-cols-3">
            {mediaImage?.length > 0 &&
              mediaImage.map((item, index) => (
                <div
                  key={item._id}
                  className="h-[140px] cursor-pointer flex items-center justify-center"
                >
                  <img src={item.image_url} alt="" />
                </div>
              ))}
          </div>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
