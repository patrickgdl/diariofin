import AccountForm from "~/pages/account-form"

const APP_NAME = "Fluxo Simples"

export default function AccountPage() {
  return (
    <div className="container h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-[400px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Bem vindo ao {APP_NAME}</h1>
            <p className="text-sm text-muted-foreground">
              O dinheiro não deveria ser tão difícil. E não é! Você está a poucos minutos de transformar a maneira como
              você gasta e economiza. Para isso inclua aqui uma conta para começarmos:
            </p>
          </div>

          <AccountForm isControlledAddMode />
        </div>
      </div>
    </div>
  )
}
