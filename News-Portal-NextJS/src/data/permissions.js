const permissionsData = [
  {
    Name: "Dashboard",
    Type: ["dashboard_show"],
  },
  {
    Name: "Category",
    Type: [
      "category_show",
      "category_create",
      "category_update",
      "category_delete",
    ],
  },
  {
    Name: "Sub Category",
    Type: [
      "sub_category_show",
      "sub_category_create",
      "sub_category_update",
      "sub_category_delete",
    ],
  },
  {
    Name: "Today News Category",
    Type: [
      "today_news_category_show",
      "today_news_category_create",
      "today_news_category_update",
      "today_news_category_delete",
    ],
  },
  {
    Name: "Social Media",
    Type: ["social_media_create", "social_media_update", "social_media_delete"],
  },
  {
    Name: "Ads",
    Type: ["ads_show", "ads_create", "ads_update", "ads_delete"],
  },
  {
    Name: "News",
    Type: ["news_show", "news_create", "news_update", "news_delete"],
  },
  {
    Name: "Online Jorip",
    Type: ["online_jorip_show", "online_jorip_create", "online_jorip_update", "online_jorip_delete"],
  },
  {
    Name: "Staff",
    Type: ["staff_show", "staff_create", "staff_update", "staff_delete"],
  },
  {
    Name: "Staff Permission",
    Type: [
      "staff_permission_show",
      "staff_permission_create",
      "staff_permission_update",
      "staff_permission_delete",
    ],
  },
  {
    Name: "Site Setting",
    Type: ["site_setting_update"],
  },
];

export default permissionsData;
