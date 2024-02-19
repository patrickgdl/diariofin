import AccountForm from "~/pages/account-form"

export default function AccountPage() {
  return (
    <div className="container h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Crie uma conta</h1>
            <p className="text-sm text-muted-foreground">
              Crie uma conta bancária para receber os pagamentos e recebimentos do seu negócio
            </p>
          </div>

          <AccountForm isControlledAddMode />
        </div>
      </div>
    </div>
  )
}
