import ProjectImages from "../pages/Projects/ProjectImages";
import Projects from "../pages/Projects/Projects";
import ProjectVideos from "../pages/Projects/ProjectVideos";

function ProjectsRoutes (){
    return [
        {
            path: "/projects",
            element: <Projects />,
        },
        {
            path: "/projects/:id/images",
            element: <ProjectImages />
        },
        {
            path: "/projects/:id/videos",
            element: <ProjectVideos />
        },
    ];
}

export default ProjectsRoutes;