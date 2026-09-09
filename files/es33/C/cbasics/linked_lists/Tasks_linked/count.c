
#include "display.h"

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
