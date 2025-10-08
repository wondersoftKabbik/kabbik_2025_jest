import RedirectComponent from "@/components/RedirectComponent/RedirectComponent.view";
import { auth } from "../lib/auth";

const GoogleRedirect = async (params: { searchParams: { route: string } }) => {
  const session = await auth();
  const redirectRoute: string = params.searchParams.route;
  return (
    <>
      <RedirectComponent session={session} redirectRoute={redirectRoute} />
    </>
  );
};

export default GoogleRedirect;
