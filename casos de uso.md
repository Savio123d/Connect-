# Casos de Uso do Sistema

## Caso de Uso 1: Cadastrar Novo Colaborador

- **Ator Principal:** Gestor (Administrador)
- **Pré-condições:** O gestor deve estar autenticado no sistema com permissões de administrador.
- **Fluxo Principal:**
    1. O gestor acede à área de "Gerenciamento de Funcionários" e seleciona a opção para adicionar um novo colaborador.
    2. O sistema exibe um formulário para o registo das informações do novo colaborador.
    3. O gestor preenche os campos obrigatórios, como nome, e-mail, cargo e setor.
    4. O gestor confirma o registo.
    5. O sistema valida os dados, cria o novo utilizador e armazena as informações na base de dados.
    6. O sistema exibe uma mensagem de sucesso e o novo colaborador passa a constar na lista de funcionários.
- **Fluxo Alternativo:**
    - No passo 3, se o gestor deixar algum campo obrigatório em branco ou inserir dados inválidos, o sistema exibirá uma mensagem de erro, indicando quais campos precisam de ser corrigidos, e não permitirá o registo até que as informações sejam validadas.
- **Pós-condições:** O novo colaborador é registrado no sistema e está apto a realizar o login para aceder à plataforma.

## Caso de Uso 2: Criar e Atribuir Tarefas

- **Ator Principal:** Gestor
- **Pré-condições:** O gestor deve estar autenticado no sistema.
- **Fluxo Principal:**
    1. O gestor seleciona a opção "Criar Tarefa" no menu do sistema.
    2. O sistema exibe um formulário para a criação da tarefa.
    3. O gestor preenche o título e a descrição da tarefa.
    4. O gestor define o nível de prioridade da tarefa (baixo, médio ou alto).
    5. O gestor atribui a tarefa a um colaborador individual ou a uma equipa inteira.
    6. O gestor confirma a criação da tarefa.
    7. O sistema armazena a nova tarefa e notifica os colaboradores ou a equipa designada.
    8. O sistema exibe uma mensagem de sucesso.
- **Fluxo Alternativo:**
    - No passo 5, se o gestor não atribuir a tarefa a ninguém, o sistema pode guardá-la como um "rascunho" ou alertar sobre a necessidade de designar um responsável.
- **Pós-condições:** A tarefa é criada, priorizada e atribuída no sistema, ficando visível para os colaboradores responsáveis.

## Caso de Uso 3: Enviar e Visualizar Feedbacks

- **Atores Principais:** Colaborador, Gestor
- **Pré-condições:** O utilizador deve estar autenticado no sistema.
- **Fluxo Principal:**
    1. O utilizador seleciona a opção "Enviar Feedback" ou "Ver Feedbacks" no menu.
    2. **Para enviar:** O sistema exibe uma interface para a escrita do feedback, onde o utilizador pode selecionar o destinatário.
    3. O utilizador escreve a mensagem de feedback e envia-a.
    4. O sistema armazena o feedback e notifica o destinatário.
    5. **Para visualizar:** O sistema exibe uma lista de feedbacks recebidos pelo utilizador.
    6. O utilizador pode clicar num feedback para ler o seu conteúdo detalhado.
- **Fluxo Alternativo:**
    - No passo 3, o sistema pode oferecer a opção de enviar o feedback de forma anónima, caso essa funcionalidade seja implementada.
- **Pós-condições:** A comunicação através de feedbacks é facilitada, promovendo uma cultura de melhoria contínua na equipa.

## Caso de Uso 4: Visualizar Gráficos de Produtividade

- **Ator Principal:** Gestor
- **Pré-condições:** O gestor deve estar autenticado no sistema.
- **Fluxo Principal:**
    1. O gestor acede à área de "Relatórios" ou ao painel principal.
    2. O sistema exibe os gráficos de produtividade para visualizar o desempenho por setor.
    3. O gestor pode aplicar filtros para analisar períodos específicos ou comparar o desempenho entre diferentes equipas.
    4. O sistema atualiza os gráficos com base nos dados de tarefas concluídas e outras métricas relevantes.
- **Fluxo Alternativo:**
    - No passo 2, se não houver dados suficientes para gerar os gráficos, o sistema exibirá uma mensagem a indicar que são necessárias mais informações.
- **Pós-condições:** O gestor consegue analisar o desempenho das equipas de forma visual, auxiliando na tomada de decisões.

## Caso de Uso 5: Publicar Avisos e Notícias

- **Ator Principal:** Gestor
- **Pré-condições:** O gestor deve estar autenticado no sistema.
- **Fluxo Principal:**
    1. O gestor seleciona a opção "Mural de Avisos e Notícias".
    2. O gestor escolhe a opção para criar uma nova publicação.
    3. O sistema exibe um editor para o gestor escrever o título e o conteúdo do aviso.
    4. O gestor confirma a publicação.
    5. O sistema publica o conteúdo no mural, que fica visível para todos os colaboradores, e pode enviar uma notificação para os manter informados.
- **Fluxo Alternativo:**
    - No passo 3, o sistema pode permitir que o gestor anexe ficheiros ou imagens à publicação.
- **Pós-condições:** A comunicação interna é centralizada, garantindo que todos recebem informações importantes de forma eficiente.

## Caso de Uso 6: Autenticação Utilizador (Login)

- **Ator Principal:** Colaborador, Gestor
- **Pré-condições:** O usuário deve possuir um registo ativo no sistema.
- **Fluxo Principal:**
    1. O utilizador acede à página de login do sistema.
    2. O utilizador insere as suas credenciais (e-mail e senha).
    3. O utilizador seleciona a opção para entrar.
    4. O sistema valida as credenciais para autenticar o utilizador.
    5. Se as credenciais estiverem corretas, o sistema concede acesso ao painel principal de acordo com o seu nível de permissão.
- **Fluxo Alternativo:**
    - No passo 4, se as credenciais estiverem incorretas, o sistema exibirá uma mensagem de erro e não permitirá o acesso.
- **Pós-condições:** O utilizador está autenticado no sistema e pode utilizar as funcionalidades do seu perfil.

## Caso de Uso 7: Gerir Informações de Funcionários

- **Ator Principal:** Gestor
- **Pré-condições:** O gestor deve estar autenticado no sistema.
- **Fluxo Principal:**
    1. O gestor acede à área de "Gerenciamento de Funcionários".
    2. O sistema exibe a lista de todos os colaboradores.
    3. O gestor pode selecionar um colaborador para visualizar ou editar as suas informações.
    4. O gestor pode também remover um colaborador do sistema.
    5. O sistema guarda as alterações realizadas ou remove o utilizador.
- **Fluxo Alternativo:**
    - No passo 4, ao tentar remover um colaborador, o sistema pode exibir uma mensagem de confirmação para evitar a exclusão acidental.
- **Pós-condições:** As informações dos funcionários são mantidas atualizadas e centralizadas na plataforma.

## Caso de Uso 8: Gerir Perfil Pessoal e Configurações

- **Ator Principal:** Colaborador, Gestor
- **Pré-condições:** O utilizador deve estar autenticado no sistema.
- **Fluxo Principal:**
    1. O utilizador clica no seu ícone de "Perfil" ou "Configurações" no menu.
    2. O sistema exibe a página de perfil com as suas informações pessoais (nome, e-mail, cargo).
    3. O utilizador pode selecionar uma opção para alterar a sua senha de acesso.
    4. O utilizador pode atualizar informações de contacto, como o seu telefone ou a sua foto de perfil.
    5. O utilizador pode guardar as alterações.
    6. O sistema valida os dados e atualiza as informações do perfil, exibindo uma mensagem de sucesso.
- **Fluxo Alternativo:**
    - No passo 3, ao alterar a senha, o sistema exigirá que o utilizador insira a senha atual e confirme a nova senha duas vezes para garantir a segurança.
- **Pós-condições:** O utilizador mantém as suas informações pessoais e credenciais de segurança atualizadas.
