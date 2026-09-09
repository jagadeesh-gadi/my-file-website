// insertion a values at begning
//  insertion a values at particular position
// insertion a values  at ending
#include <stdio.h>
#include <stdlib.h>
#define max 100
void display(int arr[], int n)
{
    int i;
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");
}
int inst_Begi(int arr[], int *n, int value)
{

    for (int i = *n; i > 0; i--)
    {
        arr[i] = arr[i - 1];
    }

    arr[0] = value;
    (*n)++;
    return *n;
}
int inst_endining(int arr[], int *n, int value)
{

    arr[*n] = value;
    (*n)++;
    return *n;
}

int instertatparticular(int arr[], int *n, int value, int pos)
{
    for (int i = *n; i > pos; i--)
    {
        arr[i] = arr[i - 1];
    }
    arr[pos] = value;
    (*n)++;
    return *n;
}
int delet_at_beg(int arr[], int *n)
{
    for (int i = 0; i < *n; i++)
    {
        arr[i] = arr[i + 1];
    }
    (*n)--;
    return *n;
}
int dele_at_end(int arr[], int *n)
{
    (*n)--;
    return *n;
}
int dele_parti(int arr[], int *n, int pos)
{
    for (int i = pos; i < *n - 1; i++)
    {
        arr[i] = arr[i + 1];
    }
    (*n)--;
    return *n;
}
int main()
{
    int i, n, value, c;
    scanf("%d", &n);

    int arr[max];

    for (i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    for (int i = 0; i < n; i++)
    {
        printf("\n ========== select option ========== \n");
        printf("1.Display\n");
        printf("2.inset at beg\n");
        printf("3.inset at parti\n");
        printf("4.inset at end\n");
        printf("5.delete at beg\n");
        printf("6.delete at\n");
        printf("7.delete at\n");
        printf("8.exit\n");
        printf("\n");
        scanf("%d", &c);

        switch (c)
        {
        case 1:
            display(arr, n);
            break;

        case 2:
            printf("enter n values to insert at beg :: ");
            scanf("%d", &value);

            // value at begging
            n = inst_Begi(arr, &n, value);
            printf("\nAfter insertion at beg: ");
            display(arr, n);
            break;
        case 3:
            // inset ar particluar pos
            int val, poss;
            printf("\nenter the valu and pos also :: ");
            scanf("%d", &val);
            scanf("%d", &poss);
            n = instertatparticular(arr, &n, val, poss);
            printf("\nafter insert value particluar pos \n ");
            display(arr, n);
            break;

        case 4:
            printf("\nenter n values to insert at end :: ");
            scanf("%d", &value);
            n = inst_endining(arr, &n, value);
            display(arr, n);
            printf("\n");
            break;
        case 5:
            // delete at beg
            n = delet_at_beg(arr, &n);
            printf("\nafter dele at front :: \n");
            display(arr, n);

        case 6:
            // // dele at paricular pos
            int pos;
            printf("\nenter pos to dele :: ");
            scanf("%d", &pos);
            n = dele_parti(arr, &n, pos);
            printf("\nafter dele of particular position \n");
            display(arr, n);

        case 7:
            // // delte at end
            n = dele_at_end(arr, &n);
            printf("\nafter delete at end :: \n");
            display(arr, n);
        case 8:
            exit(1);
            break;
        default:
            printf("enter valid number ");
            break;
        }
    }

    return 0;
}
