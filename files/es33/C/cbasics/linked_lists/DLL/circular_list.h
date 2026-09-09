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