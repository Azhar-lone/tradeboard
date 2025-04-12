import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
export default function Home() {

  return <div>
    <Link href={"/site"} className={buttonVariants({
      variant: "default",
    })}>
      Go to Site
    </Link>

    <Link href={"/login"} >
      Go to Login
    </Link>
  </div>

}
