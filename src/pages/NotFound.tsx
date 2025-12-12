import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { MagneticButton } from "@/components/MagneticButton";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-4 font-space text-8xl font-bold gradient-text">404</h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Oops! This page got lost in the AI matrix
          </p>
          <Link to="/">
            <MagneticButton variant="primary" size="lg">
              <Home className="h-5 w-5" />
              Return to Home
            </MagneticButton>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
