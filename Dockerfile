# Estágio de construção
FROM node:22 AS builder
# Define o diretório de trabalho dentro do contêiner
WORKDIR /app
# Copia todos os arquivos do diretório atual (do host) para o diretório /app no contêiner
COPY . .
# Instala as dependências do projeto definidas no package.json
RUN npm install
# Executa o comando para construir o projeto Angular
RUN npm run build

# Estágio de produção

FROM nginx:alpine

# Copia os arquivos construídos pelo estágio anterior para o diretório padrão de documentos do Nginx
COPY --from=builder /app/dist/sistemadeautenticacao/browser /usr/share/nginx/html

# Copia o arquivo de configuração personalizado do Nginx para o contêiner
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Copia o arquivo de tipos MIME para o Nginx
COPY mime.types /etc/nginx/mime.types

# Expõe a porta 80 para que o Nginx possa aceitar conexões
EXPOSE 80

# Define o comando padrão para executar o Nginx no primeiro plano
CMD ["nginx", "-g", "daemon off;"]
