#include <stdio.h>
#include <stdlib.h>
struct node
{
    int id;
    struct node *next;
};
void circular_list(struct node *head)
{
    struct node *new = malloc(sizeof(struct node));
    struct node *temp;
    temp = head;
    do
    {
        printf("%d -> ", temp->id);
        temp = temp->next;
    } while (temp != head);
    printf("HEAD\n");
}
int main()
{
    struct node *head = NULL;
    struct node *new = NULL;
    struct node *temp = NULL;

    int n, i;
    printf("enter the nof of node :: ");
    scanf("%d", &n);
    for (int i = 0; i < n; i++)
    {
        new = malloc(sizeof(struct node));

        if (new == NULL)
        {
            printf("memory allocation was not occur");
            return 0;
        }
        printf("enter the values nodes  %d :: ", i + 1);
        scanf("%d", &new->id);
        new->next = head;

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
        temp->next = head;
        printf("\n");
        circular_list(head);
    }
    return 0;
}