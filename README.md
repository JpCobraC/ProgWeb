# 📱 GUIA DEFINITIVO PARA A PROVA: PROJETO MOBILE ECOFIELD

Este repositório contém a implementação completa de uma aplicação móvel com **Expo Router**, **Clean Architecture** (Arquitetura Limpa), **Câmera**, **Geolocalização GPS**, **Mapas**, **Lista Persistente** e **Testes Unitários**.

---

## 🛠️ 1. COMANDOS DE INSTALAÇÃO E CRIAÇÃO DO PROJETO

### **Passo 1: Criar o Projeto Expo (do zero)**
```bash
npx create-expo-app@latest projeto-mobile --template blank-typescript
cd projeto-mobile
```

### **Passo 2: Instalar Todas as Dependências**
```bash
# 1. Navegação, Expo Router e Animações
npx expo install expo-router @react-navigation/drawer @react-navigation/bottom-tabs react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context expo-constants expo-linking expo-status-bar

# 2. Câmera, Geolocalização, Mapas e Ícones
npx expo install expo-camera expo-location react-native-maps @expo/vector-icons

# 3. Armazenamento Local Persistente
npx expo install @react-native-async-storage/async-storage

# 4. Jest & Testes
npm install -D jest jest-expo ts-jest @types/jest @testing-library/react-native @testing-library/jest-native react-test-renderer --legacy-peer-deps
```

### **Passo 3: Execução**
```bash
# Rodar o app (Dev Server)
npx expo start

# Rodar no Android / iOS / Web
npx expo start --android
npx expo start --ios
npx expo start --web

# Rodar os testes unitários
npm test
```

---

## 🏗️ 2. EXPLICAÇÃO DA ARQUITETURA LIMPA (CLEAN ARCHITECTURE)

Organização na pasta `src/`:

```
src/
├── domain/
│   ├── entities/          # Entidades do negócio (Observation)
│   ├── value-objects/     # Objetos de Valor com validações (Coordinates)
│   └── repositories/      # Interfaces e contratos do repositório (ObservationRepository)
├── usecases/              # Casos de Uso (RegisterObservation, ListObservations, DeleteObservation)
├── infra/                 # Implementações concretas (AsyncStorageObservationRepository)
└── factories/             # Injeção de dependências e Singleton (container.ts)
```

---

## 📑 3. PASSO A PASSO DE CADA COMPONENTE

### **1. Value Object: `Coordinates` (`src/domain/value-objects/Coordinates.ts`)**
- **O que faz**: Garante que latitude esteja entre -90 e 90, e longitude entre -180 e 180.
- **Conceito**: Value Objects são imutáveis e validados na criação.

### **2. Entidade: `Observation` (`src/domain/entities/Observation.ts`)**
- **O que faz**: Representa a entidade principal com `id`, `coordinates`, `photo`, `description` e `createdAt`.
- **Conceito**: Contém regras de negócio (ex: não aceita foto vazia).

### **3. Interface: `ObservationRepository` (`src/domain/repositories/ObservationRepository.ts`)**
- **O que faz**: Define os métodos obrigatórios do repositório: `save()`, `findAll()`, `findById()`, `delete()`.

### **4. Casos de Uso (`src/usecases/`)**
- `RegisterObservation.ts`: Valida coordenadas, cria o objeto `Observation` com ID único (`crypto.randomUUID()`) e envia para o repositório `save()`.
- `ListObservations.ts`: Busca todas as observações salvas e ordena pela data mais recente (`createdAt`).
- `DeleteObservation.ts`: Remove um registro pelo seu `id`.

### **5. Repositório Persistente (`src/infra/AsyncStorageObservationRepository.ts`)**
- **O que faz**: Converte objetos para JSON e grava no disco do celular via `@react-native-async-storage/async-storage`. Ao carregar, converte o JSON de volta em instâncias de `Observation` e `Coordinates`.

### **6. Injeção de Dependência (`src/factories/container.ts`)**
- **O que faz**: Padrão **Singleton**. Instancia o repositório e os casos de uso em um objeto global `container`, permitindo acessar `container.registerObservation.execute(...)` em qualquer tela sem reinstanciar dependências.

---

## 🌐 4. NAVEGAÇÃO E TELAS (EXPO ROUTER)

- **`app/_layout.tsx`**: Layout Raiz com o `Stack` (Login e Drawer).
- **`app/index.tsx`**: Tela de Login com formulário e navegação `router.replace('/(drawer)/(tabs)')`.
- **`app/(drawer)/_layout.tsx`**: Layout do menu lateral (Drawer Navigation). ATENÇÃO: O nome do arquivo DEVE ser `_layout.tsx` (no singular).
- **`app/(drawer)/(tabs)/_layout.tsx`**: Layout das abas inferiores (Tabs).
- **`app/(drawer)/(tabs)/index.tsx`**: Câmera com solicitação de permissão, captura de foto, GPS e botão de salvar.
- **`app/(drawer)/(tabs)/list.tsx`**: Lista com `FlatList`, `useFocusEffect` (para atualizar a lista ao focar na aba) e botão de deletar.
- **`app/(drawer)/(tabs)/maps.tsx`**: Mapa com `MapView`, marcadores `<Marker>` em cada coordenada salva e `<Callout>` exibindo o thumbnail da foto.
