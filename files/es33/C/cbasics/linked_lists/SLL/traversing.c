
// traversing the linked list using
#include <stdio.h>
struct node
{
    int data;
    char c;
    struct node *link;
};

int main()
{
    int n, i;
    scanf("%d", &n);

    struct node some[n];
    int arr[n];
    for (i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }
    for (i = 0; i < n; i++)
    {
        some[i].data = arr[i];
        if (i < n - 1)
            some[i].link = &some[i + 1];
        else
            some[i].link = NULL;
    }

    struct node *q = &some[0];

    while (q != NULL)
    {
        printf("%d ", q->data);
        q = q->link;
    }

    return 0;
}