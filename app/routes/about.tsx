export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-12">
        {/* About Me Section */}
        <section>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            About Me
          </h2>
          <div className="mt-6 text-lg text-gray-500 dark:text-gray-300 space-y-4">
            <p>
              I'm a passionate full-stack developer with a strong foundation in web technologies
              and a keen eye for creating elegant solutions to complex problems. With several
              years of experience in the industry, I've worked on various projects ranging
              from small business websites to large-scale enterprise applications.
            </p>
            <p>
              My journey in software development began with a curiosity about how things work
              on the web, which led me to dive deep into programming and web technologies.
              I'm constantly learning and exploring new technologies to stay at the forefront
              of web development.
            </p>
          </div>
        </section>

        {/* Experience Section */}
        <section>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Experience
          </h2>
          <div className="mt-6 space-y-8">
            {/* Experience Item 1 */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Senior Developer
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400">Company Name</p>
                </div>
                <p className="text-gray-500 dark:text-gray-300">2020 - Present</p>
              </div>
              <ul className="mt-4 list-disc list-inside text-gray-500 dark:text-gray-300 space-y-2">
                <li>Led development of key features for enterprise applications</li>
                <li>Mentored junior developers and conducted code reviews</li>
                <li>Implemented CI/CD pipelines and improved development workflows</li>
              </ul>
            </div>

            {/* Experience Item 2 */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Full Stack Developer
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400">Previous Company</p>
                </div>
                <p className="text-gray-500 dark:text-gray-300">2018 - 2020</p>
              </div>
              <ul className="mt-4 list-disc list-inside text-gray-500 dark:text-gray-300 space-y-2">
                <li>Developed and maintained multiple web applications</li>
                <li>Collaborated with design and product teams</li>
                <li>Optimized application performance and user experience</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Education
          </h2>
          <div className="mt-6 space-y-8">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Bachelor of Science in Computer Science
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400">University Name</p>
                </div>
                <p className="text-gray-500 dark:text-gray-300">2014 - 2018</p>
              </div>
              <p className="mt-4 text-gray-500 dark:text-gray-300">
                Focused on software engineering and web development. Participated in various
                hackathons and coding competitions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 