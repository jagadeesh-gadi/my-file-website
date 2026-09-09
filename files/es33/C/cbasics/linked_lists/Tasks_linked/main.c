

#include "display.h"
// #include "count.h"
// #include "functions_linked.h"

int main()
{
    int i, n, key;
    struct node *head = NULL;
    struct node *temp = NULL;
    struct node *new = NULL;
    printf("enter n values ::");
    scanf("%d", &n);
    for (i = 0; i < n; i++)
    {
        new = malloc(sizeof(struct node));

        if (new == NULL)
        {
            printf("memory not allocted \n");
            return 1;
        }

        printf("enter node data :: %d\n", i + 1);
        scanf("%d", &new->id);

        new->next = NULL;

        if (head == NULL)
        {
            head = new;
            temp = new;
        }
        else
        {
            temp->next = new;
            temp = new;
        }
    }

    insert_at_beg(head, new, temp);
    insert_at_end(head, new, temp);
    insert_particular_position(head);

    delete_at_beg(&head);
    delet_at_particluar(head);
    delete_at_end(head);
    // printf("\ncount values :: %d\n", count(head));
    // count an values in the list
    // printf("\ncount values :: %d\n", count(head));

    // search  an element in  a linked list
    // printf("\nenter value to find :: ");
    // scanf("%d", &key);
    // if (search(head, key))
    // {
    //     printf("found :: %d\n", key);
    // }
    // else
    // {
    //     printf("not found: %d\n", key);
    // }

    // // free the malloc space after working
    // while (temp != NULL)
    // {
    //     struct node *next = temp->next;
    //     free(temp);
    //     temp = next;
    // }

    printf("\n");
    return 0;
}
