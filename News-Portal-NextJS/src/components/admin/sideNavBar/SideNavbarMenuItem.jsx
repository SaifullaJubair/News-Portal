import Link from "next/link";

const SideNavbarMenuItem = () => {
  return (
    <ul>
      <li className="mt-2">
        <Link
          href="/admin"
          className="flex items-center gap-[10px] rounded-lg text-base font-medium"
        >
          <span> Dashboard</span>
        </Link>
      </li>
      <li className="mt-2">
        <Link
          href="/admin/news"
          className="flex items-center gap-[10px] rounded-lg text-base font-medium"
        >
          <span> News</span>
        </Link>
      </li>
      <li className="mt-2">
        <Link
          href="/admin/category"
          className="flex items-center gap-[10px] rounded-lg text-base font-medium"
        >
          <span> Category</span>
        </Link>
      </li>
      <li className="mt-2">
        <Link
          href="/admin/sub-category"
          className="flex items-center gap-[10px] rounded-lg text-base font-medium"
        >
          <span> Sub Category</span>
        </Link>
      </li>
      <li className="mt-2">
        <Link
          href="/admin/today-news-category"
          className="flex items-center gap-[10px] rounded-lg text-base font-medium"
        >
          <span> Today News Category</span>
        </Link>
      </li>
      <li className="mt-2">
        <Link
          href="/admin/ads"
          className="flex items-center gap-[10px] rounded-lg text-base font-medium"
        >
          <span> Ads</span>
        </Link>
      </li>
      <li className="mt-2">
        <Link
          href="/admin/social-media"
          className="flex items-center gap-[10px] rounded-lg text-base font-medium"
        >
          <span> Social Media</span>
        </Link>
      </li>
      <li className="mt-2">
        <Link
          href="/admin/all-staff"
          className="flex items-center gap-[10px] rounded-lg text-base font-medium"
        >
          <span> All Staff</span>
        </Link>
      </li>
      <li className="mt-2">
        <Link
          href="/admin/staff-permission"
          className="flex items-center gap-[10px] rounded-lg text-base font-medium"
        >
          <span> All Staff</span>
        </Link>
      </li>
      <li className="mt-2">
        <Link
          href="/admin/setting"
          className="flex items-center gap-[10px] rounded-lg text-base font-medium"
        >
          <span> Site Setting</span>
        </Link>
      </li>
    </ul>
  );
};

export default SideNavbarMenuItem;
