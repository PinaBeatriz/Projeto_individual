create database capoeira;
use capoeira;

create table usuario(
id_user int primary key auto_increment,
nome varchar(50) not null,
email varchar(100) not null unique,
senha varchar(15)not null
);
select * from usuario;

create table quiz(
id_quiz int primary key auto_increment,
titulo varchar (50) not null,
qdt_perg int not null
);

-- Quizzes
INSERT INTO quiz (titulo, qdt_perg) VALUES
('Quiz Geral - Básico', 4),
('Quiz Musica - Básico', 4),
('Quiz Movimento - Básico', 4);

select * from quiz;

create table pontuacao( 
id_pont int auto_increment,
fkUser int,
fkQuiz int,
constraint pontuacaoUser foreign key (fkUser) references usuario(id_user),
constraint quizPontuacao foreign key (fkQuiz) references quiz(id_quiz),
constraint pkComposta primary key (id_pont, fkUser, fkQuiz),
dtpont datetime default current_timestamp,
qtd_acertos int not null,
qtd_erros int not null
);

select * from pontuacao;


-- RANKING
SELECT u.nome, MAX(p.qtd_acertos) AS qtd_acertos
    FROM pontuacao p
    JOIN usuario u ON p.fkUser = u.id_user
    WHERE p.fkQuiz = 1
    GROUP BY u.id_user
    ORDER BY qtd_acertos DESC
    LIMIT 8;


-- PONTUAÇÃO TOTAL DE TENTATIVAS 
CREATE VIEW view_pontuacao_total_por_usuario AS
SELECT u.id_user,
u.nome,
COUNT(p.id_pont) AS total_tentativas,      -- total de tentativas do usuário
SUM(p.qtd_acertos) AS total_acertos        -- soma dos acertos em todas as tentativas do usuário
FROM usuario u
JOIN pontuacao p ON u.id_user = p.fkUser
GROUP BY u.id_user, u.nome;

select * from view_pontuacao_total_por_usuario;

-- QTD DE ACERTOS E ERROS POR USUARIO
CREATE VIEW view_acertos_erros_por_usuario AS
SELECT u.nome,
SUM(p.qtd_acertos) AS total_acertos,
SUM(p.qtd_erros) AS total_erros
FROM pontuacao p
JOIN usuario u ON p.fkUser = u.id_user
GROUP BY u.nome;

select * from view_acertos_erros_por_usuario;


-- ACERTOS E ERROS POR QUIZ grafico
-- Para cada quiz (identificado pelo id_quiz e titulo), soma o total de acertos e erros em todas as tentativas feitas
CREATE VIEW view_desempenho_por_quiz AS
SELECT q.id_quiz,
q.titulo,
SUM(p.qtd_acertos) AS total_acertos,
SUM(p.qtd_erros) AS total_erros
FROM pontuacao p
JOIN quiz q ON p.fkQuiz = q.id_quiz
GROUP BY q.id_quiz, q.titulo;

SELECT * FROM view_desempenho_por_quiz;






