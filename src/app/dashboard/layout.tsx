export default function DashboardLayout({
  children,
  billing,
  home,
  notifications,
  settings,
}: {
  children: React.ReactNode;
  billing: React.ReactNode;
  home: React.ReactNode;
  notifications: React.ReactNode;
  settings: React.ReactNode;
}){
    return (
        <div className="flex">
            <div>{children}</div>
            <div>{home}</div>
        </div>
    )
};
