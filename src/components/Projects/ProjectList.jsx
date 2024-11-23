import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import ProjectCard from "./ProjectCard";

const projectList = [
  {
    nomeProjeto: "Sistema de Feedback",
    descricao: "Aplicação para troca de feedbacks entre colegas.",
    imagemProjeto: "https://via.placeholder.com/150", // URL fictícia
  },
  {
    nomeProjeto: "Gerenciador de Tarefas",
    descricao: "Ferramenta para organizar e priorizar tarefas diárias.",
    imagemProjeto: "https://via.placeholder.com/150",
  },
  {
    nomeProjeto: "Rede Social de Colaboração",
    descricao:
      "Plataforma para conectar profissionais em projetos colaborativos.",
    imagemProjeto: "https://via.placeholder.com/150",
  },
];
const ProjectList = () => {
  //   const [feedbackList, setFeedbackList] = useState([]);
  //   const { user } = useSelector((state) => state.auth);
  //   const dispatch = useDispatch();
  //   const idUsuario = user?.id;
  //   const [error, setError] = useState(null);
  //   const [pagination, setPagination] = useState({});

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       if (idUsuario) {
  //         const result = await feedbackService.fetchFeedbacks(idUsuario);
  //         if (result.error) {
  //           setError(result.error);
  //         } else {
  //           setFeedbackList(result.content);
  //           setPagination({
  //             pageable: result.pageable,
  //             totalElements: result.totalElements,
  //             totalPages: result.totalPages,
  //             number: result.number,
  //             size: result.size,
  //           });
  //         }
  //       }
  //     };

  //     fetchData();
  //   }, [idUsuario]);

  return (
    <Box>
      <AppBar position="static" sx={{ width: "100%", marginBottom: 1 }}>
        <Toolbar sx={{ width: "100%" }}>
          <Typography variant="h6">Projetos</Typography>
        </Toolbar>
      </AppBar>
      {projectList.map((project, index) => (
        <ProjectCard
          key={index}
          nomeProjeto={project.nomeProjeto}
          descricao={project.descricao}
        />
      ))}
    </Box>
  );
};

export default ProjectList;
