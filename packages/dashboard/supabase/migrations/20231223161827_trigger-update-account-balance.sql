-- Create a trigger function to update the account balance when a transaction is created
CREATE OR REPLACE FUNCTION public.update_account_balance() 
RETURNS TRIGGER AS $$
BEGIN
    -- Check if transaction category is not a "new account", that means it's a "saldo inicial" transaction
    -- This would duplicate balance, on account creation and on "saldo inicial" transaction
    IF NEW.category_id <> 'c5aee89c-f7ca-430d-ba9e-d9a90ada09d7' THEN
        BEGIN
            -- Update the account balance
            UPDATE account
            SET balance = balance + NEW.amount
            WHERE id = NEW.account_id;

        EXCEPTION
            WHEN others THEN
                -- Handle exceptions if the update fails
                -- You can log the error, raise an exception, or perform other error-handling actions
                RAISE WARNING 'Failed to update account balance for transaction id %, error: %', NEW.id, SQLERRM;
        END;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to execute the function after a new transaction is inserted
CREATE TRIGGER on_transaction_created
AFTER INSERT ON public.transactions
FOR EACH ROW EXECUTE FUNCTION public.update_account_balance();
