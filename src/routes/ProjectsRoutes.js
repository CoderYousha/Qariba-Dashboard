import Projects from "../pages/Projects/Projects";

function ProjectsRoutes (){
    return [
        {
            path: "/projects",
            element: <Projects />,
        }
    ];
}

export default ProjectsRoutes;