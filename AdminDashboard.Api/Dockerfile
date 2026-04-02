FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["AdminDashboard.Api.csproj", "./"]
RUN dotnet restore "AdminDashboard.Api.csproj"

COPY . .
RUN dotnet publish "AdminDashboard.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://0.0.0.0:7860
EXPOSE 7860

ENTRYPOINT ["dotnet", "AdminDashboard.Api.dll"]
