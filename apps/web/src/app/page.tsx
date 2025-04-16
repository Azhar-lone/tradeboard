"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    if (window.localStorage.getItem("loggedIn") === "true") {
      redirect("/dashboard");
    } else {
      redirect("/login");
    }
  }, []);
};

export default Home;
