import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
const AppWrapper = () => {
  return (
    <AppShell
      classNames={{
        root: "bg-transparent",
        header: "bg-slate h-fit border-b-2",
        main: "bg-transparent h-full p-0 overflow-auto",
      }}
    >
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AppWrapper;
