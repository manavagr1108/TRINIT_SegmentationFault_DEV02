import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
const AppWrapper = () => {
  return (
    <AppShell
      classNames={{
        root: "bg-transparent",
        header: "bg-slate h-fit border-b-2",
        main: "bg-transparent h-full p-0 pt-[8.5vh] overflow-auto",
      }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AppWrapper;
