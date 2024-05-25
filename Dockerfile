FROM node:16 AS build

WORKDIR /app

COPY client/package*.json ./

RUN npm install

COPY client/ ./

ARG VITE_BASE_URL
ENV VITE_BASE_URL=${VITE_BASE_URL}
RUN echo "VITE_BASE_URL is set to $VITE_BASE_URL"

ARG VITE_STRIPE_PUBLIC_KEY
ENV VITE_STRIPE_PUBLIC_KEY=${VITE_STRIPE_PUBLIC_KEY}
RUN echo "VITE_STRIPE_PUBLIC_KEY is set to $VITE_STRIPE_PUBLIC_KEY"

RUN npm run build

RUN ls -al /app/dist

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN ls -al /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
