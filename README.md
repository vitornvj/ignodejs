# Cadastro de carro

**Requisitos Funcionais(RF)**
- Deve ser possível cadastrar um novo carro.

**Regras de Negócio(RN)**
- Não deve ser possível cadastrar um carro com uma placa já existente
- O carro deve ser cadastrado com disponibilidade por padrão.
<!-- - O usuário responsável pelo cadastro deve ter permissão de administrador. -->


# Listagem de carros

**Requisitos Funcionais(RF)**
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome da carro.

**Requisitos Não-Funcionais(RNF)**
- O usuário nao precisa está logado no sistema.


# Cadastro de especificação do carro
**Requisitos Funcionais(RF)**
- Deve ser possível cadastrar uma especificação para um carro.
- Deve ser possível listar todas as especificações.
- Deve ser possível listar todos os carros.

**Regras de Negócio(RN)**
- Não deve ser possível cadastrar uma especificação caso o carro não exista.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ter permissão de administrador.


# Cadastro de imagens do carro
**Requisitos Funcionais(RF)**
- Deve ser possível cadastrar a imagem de um carro.
- Deve ser possível listar todos os carros.

**Requisitos Não-Funcionais(RNF)**
- Utilizar o multer para upload de arquivos

**Regras de Negócio(RN)**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um administrador.

# Aluguel de carro
**Requisitos Funcionais(RF)**
- 
- Deve ser possível cadastrar um aluguel

**Regras de Negócio(RN)**
- O usuário de estar logado 
- O aluguel deve ter duração mínima de 24 horas.
- Ao realizar um aluguel , o status do carro deverá ser alterado para indisponível.
- Não deve ser possível cadastrar um novo aluguel caso já exista um para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um para o mesmo carro.

# Recuperação de senha
- Deve ser possível o usuário recuperar a senha informando o email
- O usuário deve receber um email com o passo a passo de recuperação de senha
- O usuário deve inserir uma nova senha

- O usuário precisa informar uma nova senha
- O link enviado para o email deve expirar em 3 horas.

