import { Button, Flex } from "@mantine/core";
import { getGoogleUrl } from "../../utils/tutor.utils";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="grid grid-flow-col grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center justify-center">
          <main className="max-w-screen-xl px-4 lg:px-16">
            <div className="text-left">
              <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                Learn the real
                <span className="text-indigo-600"> YOU</span>
              </h2>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Community to meet and interact different people from around the
                world!
              </p>
              <div className="mt-5 sm:mt-8 sm:flex justify-start">
                <Button
                  to={getGoogleUrl(false)}
                  className="w-full flex items-center justify-center border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out"
                  component={Link}
                >
                  Login as student
                </Button>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button
                    to={getGoogleUrl(true)}
                    className="w-full flex items-center justify-center border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out"
                    component={Link}
                  >
                    Login as tutor
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div
          className="w-full object-cover h-72 lg:w-full md:h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80)`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default Home;
