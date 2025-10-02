# Estrutura do Projeto

Este documento descreve as tabelas do banco de dados e a divisão de domínios/módulos da API.

---

## MÓDULOS DO BACK-END

Cada módulo possui uma ou mais tabelas do banco de dados, organizadas por domínio.

### 01 - USUÁRIOS
Tabelas relacionadas à gestão de usuários e perfis:
- USUARIOS
- SUPERADMINS
- MODERADORES
- PROFESSORES
- ALUNOS
- RESPONSAVEIS
- ALUNOS_RESPONSAVEIS (N:N)

### 02 - ACADÊMICO
Tabelas relacionadas a turmas, matérias e relacionamentos acadêmicos:
- TURMAS
- MATERIAS
- ALUNOS_MATERIAS (N:N)
- PROFESSORES_TURMAS (N:N)

### 03 - AUTH
Módulo responsável pela autenticação e login de usuários:
- Login

### 04 - COMUNIDADES
Tabelas relacionadas a grupos e comunidades de estudo:
- COMUNIDADES

### 05 - ATIVIDADES
Tabelas relacionadas a atividades escolares, resoluções e correções:
- ATIVIDADES
- RESOLUCOES
- CORRECOES

### 06 - POSTS
Tabelas relacionadas ao feed de publicações, respostas e interações:
- POSTS
- RESPOSTAS
- CURTIDAS  
*(parametrizado pelo contexto: feed ou comunidade)*

### 07 - FEEDS
Tabelas relacionadas aos feeds de conteúdo:
- FEEDS

### 08 - INSTITUIÇÕES
Tabelas relacionadas às instituições de ensino:
- INSTITUICOES

---

## TABELAS DO BANCO DE DADOS

### INSTITUICOES
| Campo    | Tipo |
|----------|------|
| id       | UUID  |
| nome     | String |
| telefone | String |
| cnpj     | String |
| endereco | String |

### USUARIOS
| Campo               | Tipo | Observações |
|--------------------|------|-------------|
| id                 | UUID  |
| instituicao_id     | UUID  | FK -> INSTITUICOES |
| primeiro_nome      | String | |
| sobrenome          | String | |
| email              | String | |
| senha              | String | |
| data_nascimento    | Date | |
| telefone           | String | |
| foto_perfil_caminho| String | Opcional |
| cargo              | Enum | SUPERADMIN, MODERADOR, PROFESSOR, ALUNO, RESPONSAVEL |

### SUPERADMINS
| Campo   | Tipo | Observações |
|---------|------|-------------|
| user_id | UUID | FK -> USUARIOS |

### MODERADORES
| Campo   | Tipo | Observações |
|---------|------|-------------|
| user_id | UUID | FK -> USUARIOS |
| setor   | String | |

### PROFESSORES
| Campo           | Tipo | Observações |
|-----------------|------|-------------|
| user_id         | UUID | FK -> USUARIOS |
| matricula       | String | |
| status_contrato | String | |
| carga_horaria   | Integer | |

### RESPONSAVEIS
| Campo            | Tipo | Observações |
|------------------|------|-------------|
| user_id          | UUID | FK -> USUARIOS |
| grau_parentesco  | String | |
| cpf              | String | |

### ALUNOS
| Campo          | Tipo | Observações |
|----------------|------|-------------|
| user_id        | UUID | FK -> USUARIOS |
| matricula      | String | |
| turma_id       | UUID | FK -> TURMAS |
| status_matricula | String | |

### ALUNOS_RESPONSAVEIS (N:N)
| Campo          | Tipo | Observações |
|----------------|------|-------------|
| aluno_id       | UUID | FK -> ALUNOS |
| responsavel_id | UUID | FK -> RESPONSAVEIS |

### TURMAS
| Campo   | Tipo |
|---------|------|
| id      | UUID |
| titulo  | String |
| periodo | String |

### MATERIAS
| Campo        | Tipo | Observações |
|--------------|------|-------------|
| id           | UUID |
| titulo       | String |
| tipo         | Enum | EXATAS, HUMANAS, NATUREZA, LINGUAGENS |
| professor_id | UUID | FK -> PROFESSORES |

### ALUNOS_MATERIAS (N:N)
| Campo     | Tipo | Observações |
|-----------|------|-------------|
| aluno_id  | UUID | FK -> ALUNOS |
| materia_id| UUID | FK -> MATERIAS |

### PROFESSORES_TURMAS (N:N)
| Campo        | Tipo | Observações |
|--------------|------|-------------|
| professor_id | UUID | FK -> PROFESSORES |
| turma_id     | UUID | FK -> TURMAS |

### FEEDS
| Campo      | Tipo |
|------------|------|
| id         | UUID |
| titulo     | String |
| tipo_perfil| String |

### COMUNIDADES
| Campo        | Tipo | Observações |
|--------------|------|-------------|
| id           | UUID |
| titulo       | String |
| foto_caminho | String | Opcional |
| materia_id   | UUID | FK -> MATERIAS |
| professor_id | UUID | FK -> PROFESSORES |
| turma_id     | UUID | FK -> TURMAS |

### ATIVIDADES
| Campo         | Tipo | Observações |
|---------------|------|-------------|
| id            | UUID |
| titulo        | String |
| conteudo      | Text |
| pdf_caminho   | String | Opcional |
| data_inicio   | DateTime |
| data_fim      | DateTime |
| comunidade_id | UUID | FK -> COMUNIDADES |

### RESOLUCOES
| Campo        | Tipo | Observações |
|--------------|------|-------------|
| id           | UUID |
| aluno_id     | UUID | FK -> ALUNOS |
| atividade_id | UUID | FK -> ATIVIDADES |
| conteudo     | Text |
| pdf_caminho  | String | Opcional |

### CORRECOES
| Campo        | Tipo | Observações |
|--------------|------|-------------|
| id           | UUID |
| resolucao_id | UUID | FK -> RESOLUCOES |
| professor_id | UUID | FK -> PROFESSORES |
| conteudo     | Text |
| pdf_caminho  | String | Opcional |

### POSTS
| Campo        | Tipo | Observações |
|--------------|------|-------------|
| id           | UUID  |
| titulo       | String |
| conteudo     | Text |
| foto_caminho | String | Opcional |
| user_id      | UUID | FK -> USUARIOS |
| feed_id      | UUID | FK -> FEEDS |
| comunidade_id| UUID | FK -> COMUNIDADES |

### RESPOSTAS
| Campo      | Tipo | Observações |
|------------|------|-------------|
| id         | UUID |
| conteudo   | Text |
| user_id    | UUID | FK -> USUARIOS |
| post_id    | UUID | FK -> POSTS |
| resposta_id| UUID | FK -> RESPOSTAS (opcional) |

### CURTIDAS
| Campo      | Tipo | Observações |
|------------|------|-------------|
| id         | UUID |
| user_id    | UUID | FK -> USUARIOS |
| post_id    | UUID | FK -> POSTS |
| resposta_id| UUID | FK -> RESPOSTAS (opcional) |


