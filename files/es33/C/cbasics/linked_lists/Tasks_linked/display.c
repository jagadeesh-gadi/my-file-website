
#include "display.h"

int insert_at_beg(struct node *head, struct node *new, struct node *temp)
{
    new = malloc(sizeof(struct node));

    if (new == NULL)
    {
        printf("memory not allocated\n");
        return 1;
    }

    printf("enter value to insert at begi :: ");
    scanf("%d", &new->id);

    new->next = head;
    head = new;

    display(head);

    return 0;
}

int insert_at_end(struct node *head, struct node *new, struct node *temp)
{
    new = malloc(sizeof(struct node));

    if (new == NULL)
    {
        printf("space not allocated\n");
        return 1;
    }

    printf("enter value to insert at end :: ");
    scanf("%d", &new->id);

    new->next = NULL;

    if (head == NULL)
    {
        printf("list is empty\n");
        free(new);
        return 0;
    }

    temp = head;

    while (temp->next != NULL)
    {
        temp = temp->next;
    }

    temp->next = new;

    display(head);

    return 0;
}

int insert_particular_position(struct node *head)
{
    struct node *temp;
    struct node *new;
    int pos, i;

    new = malloc(sizeof(struct node));

    if (new == NULL)
    {
        printf("memory not allocated\n");
        return 1;
    }

    printf("enter value to insert :: ");
    scanf("%d", &new->id);

    printf("enter position to insert :: ");
    scanf("%d", &pos);

    if (pos == 1)
    {
        printf("use insert at beginning\n");
        free(new);
        return 0;
    }

    if (head == NULL)
    {
        printf("list is empty\n");
        free(new);
        return 0;
    }

    temp = head;

    for (i = 1; i < pos - 1; i++)
    {
        if (temp->next == NULL)
        {
            printf("invalid position\n");
            free(new);
            return 0;
        }

        temp = temp->next;
    }

    new->next = temp->next;
    temp->next = new;

    display(head);

    return 0;
}

int delete_at_beg(struct node **head)
{
    struct node *temp;

    printf("delete at begin\n");

    if (*head == NULL)
    {
        printf("list was empty\n");
        return 1;
    }

    temp = *head;
    *head = (*head)->next;

    free(temp);

    display(*head);

    return 0;
}

int delet_at_particluar(struct node *head)
{
    struct node *temp;
    struct node *posn;
    int pos, i;

    printf("enter pos to delete :: ");
    scanf("%d", &pos);

    if (head == NULL)
    {
        printf("list empty\n");
        return 0;
    }

    if (pos == 1)
    {
        printf("use delete at beginning\n");
        return 0;
    }

    temp = head;

    for (i = 1; i < pos - 1; i++)
    {
        if (temp->next == NULL)
        {
            printf("invalid position\n");
            return 0;
        }

        temp = temp->next;
    }

    posn = temp->next;

    if (posn == NULL)
    {
        printf("invalid position\n");
        return 0;
    }

    temp->next = posn->next;

    free(posn);

    display(head);

    return 0;
}

int delete_at_end(struct node *head)
{
    struct node *temp;

    if (head == NULL)
    {
        printf("list empty\n");
        return 0;
    }

    if (head->next == NULL)
    {
        free(head);
        head = NULL;
        return 0;
    }

    temp = head;

    while (temp->next->next != NULL)
    {
        temp = temp->next;
    }

    free(temp->next);
    temp->next = NULL;
    printf("delete at end \n");
    display(head);

    return 0;
}

int display(struct node *head)
{
    printf("\nLinked List: ");

    while (head != NULL)
    {
        printf("%d -> ", head->id);
        head = head->next;
    }

    printf("NULL\n\n");

    return 0;
}

int count(struct node *head)
{
    struct node *temp;
    int count = 0;

    temp = head;

    while (temp != NULL)
    {
        count++;
        temp = temp->next;
    }

    return count;
}

int search(struct node *head, int key)
{
    struct node *temp;

    temp = head;

    while (temp != NULL)
    {
        if (temp->id == key)
        {
            return 1;
        }

        temp = temp->next;
    }

    return 0;
}
