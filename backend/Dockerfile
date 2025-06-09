FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

COPY . .

RUN dotnet restore src/Bootstrapper/Api/Api.csproj

RUN dotnet publish src/Bootstrapper/Api/Api.csproj -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /publish

COPY --from=build /publish .

ENV ASPNETCORE_URLS=http://+:5247

ENTRYPOINT ["dotnet", "Api.dll"]
# dotnet dev-certs https -ep $HOME/.aspnet/https/devapp.pfx -p awesomepass
# dev-app % docker run --rm -it \
#   -p 8080:5000 \
#   -p 8081:5001 \
#   -e ASPNETCORE_Kestrel__Certificates__Default__Password="awesomepass" \
#   -e ASPNETCORE_Kestrel__Certificates__Default__Path=/https/devapp.pfx \
#   -v $HOME/.aspnet/https:/https/ 