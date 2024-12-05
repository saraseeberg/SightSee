import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/lib/context/auth-context'
import { ApolloError } from '@apollo/client'
import { AlertDialogPortal } from '@radix-ui/react-alert-dialog'
import { useDeleteUserMutation } from '@Types/__generated__/resolvers-types'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

const DeleteModal = () => {
  const { user, logout } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [deleteUser] = useDeleteUserMutation()

  const handleDelete = async () => {
    try {
      await deleteUser({
        variables: {
          id: user?.id || '',
        },
      })
      toast.toast({
        title: 'Account Deleted',
        description: 'Your account has been deleted',
      })
      logout()
      navigate('/')
    } catch (error) {
      console.error(error)
      if (error instanceof ApolloError) {
        if (error.graphQLErrors[0].extensions?.code === 'DEFAULT_USER_DELETE') {
          toast.toast({
            title: 'Error',
            description: 'You cannot delete the test account.',
            variant: 'destructive',
          })
        } else {
          toast.toast({
            title: 'Error',
            description: 'An error occurred while deleting your account',
            variant: 'destructive',
          })
        }
      }
    }
  }
  return (
    <>
      <PrivacyModule
        title="Delete Account"
        description="Permenetaly delete your account. This will remove any data related to you and is not reversible."
      >
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogPortal>
            <AlertDialogContent>
              <AlertDialogTitle>Are you asbolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete your account? This action is irreversible.
              </AlertDialogDescription>
              <div className="flex gap-2 mt-4">
                <Button variant="destructive" onClick={handleDelete}>
                  Delete Account
                </Button>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </div>
            </AlertDialogContent>
          </AlertDialogPortal>
        </AlertDialog>
      </PrivacyModule>
    </>
  )
}

export const PrivacyModule = (props: { title: string; description?: string; children: ReactNode }) => {
  return (
    <section className="border p-4 rounded-lg m-2">
      <div className="space-y-2 mb-6">
        <h3 className="text-2xl font-bold">{props.title}</h3>
        <p className="text-sm text-muted-foreground">{props.description}</p>
      </div>
      {props.children}
    </section>
  )
}

export default DeleteModal
