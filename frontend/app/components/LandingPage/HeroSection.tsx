import React from "react";
import { ReactTyped } from "react-typed";

function LoginHeroSection() {
  return (
    <main className="h-[90vh] flex justify-center items-center bg-black">
      <div className="flex gap-10 items-center justify-between p-10 w-full h-full">
        <div className="flex-1">
          <h1 className="flex flex-col items-center justify-center h-full w-full text-3xl font-semibold text-light-purple">
            <ReactTyped
              strings={[
                "Keep track of your job applications.", // !!
                "Stay organized", // !!
                "Stay on top of your job search.", // !!
                "Get hired faster.", // !!
                "Find your dream job.", // !!
              ]}
              typeSpeed={40}
              backSpeed={50}
              loop
            />
          </h1>
        </div>
        <div className="flex-1">
          <video
            width={600}
            height={600}
            loop
            autoPlay
            
            muted
            className="rounded-lg border  shadow-lg"
          >
            <source
              src="https://dvy41h3mvcuey.cloudfront.net/skySightPreview.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </main>
  );
}

export default LoginHeroSection;

// Fixing permission is s3 bucket
