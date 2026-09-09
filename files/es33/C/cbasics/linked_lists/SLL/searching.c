// searching element in linkedlist
#include <stdio.h>
struct node
{
    int data;
    // char c;
    struct node *link;
};

int main()
{
    int n, i, data;
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
        {
            some[i].link = &some[i + 1];
        }
        else
        {
            some[i].link = NULL;
        }
    }
    printf("enter value  to search index  :: ");
    scanf("%d", &data);
    struct node *q = &some[0];
    int flag = 0;
    for (i = 0; i < n; i++)

    {
        if (arr[i] == data)
        {
            flag++;
            printf("data  fount index : %d \n", i);
            break;
        }
        q = q->link;
    }
    if (flag == 0)
    {
        printf("not found\n");
    }

    return 0;
}
