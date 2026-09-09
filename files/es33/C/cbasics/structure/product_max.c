// Structure + Array + Function

// Create a Product structure:

// struct Product
// {
//     int id;
//     char name[30];
//     float price;
//     int quantity;
// };

// Write functions to:

// Input 5 products.
// Display all products.
// Calculate total inventory value.
// Find the most expensive product.
#include <stdio.h>
#include <string.h>
typedef struct
{
    int id;
    char name[30];
    float price;
    int quantity;
} product_t;

void scan_values(product_t *p, int n)
{
    int i;
    for (i = 0; i < n; i++)
    {
        printf("enter product details :: %d\n", i + 1);
        scanf("%d", &p[i].id);
        scanf("%s", p[i].name);
        scanf("%f", &p[i].price);
        scanf("%d", &p[i].quantity);
    }
    printf("\n");
}
void print_values(product_t *p, int n)
{
    int i;
    printf("\n ============ product details ============ \n");
    for (i = 0; i < n; i++)
    {
        printf("enter product details :: %d\n", i + 1);
        printf("id :: %d\n", p[i].id);
        printf("name :: %s\n", p[i].name);
        printf("price :: %f\n", p[i].price);
        printf("quantity :: %d\n", p[i].quantity);
    }
    printf("\n");
}

int total_product(product_t *p, int n)
{

    int i, max, total = 0;
    for (i = 0; i < n; i++)
    {

        total += p[i].price * p[i].quantity;
    }
    return total;
}
int max_product(product_t *p, int n, char *name)
{
    int i, max = 0;
    for (i = 0; i < n; i++)
    {
        if (p[i].price > max)
        {
            strcpy(name, p[i].name);
            max = p[i].price;
        }
    }

    return max;
}
int main()
{
    int n, i;
    printf("enter n value ::");
    scanf("%d", &n);
    product_t p[n];
    scan_values(p, n);
    print_values(p, n);

    int total = total_product(p, n);
    printf("\n==== total _product ===== \n");
    printf("total : %d\n", total);
    char name[100];

    int max = max_product(p, n, name);
    printf("\n==== max _product ===== \n");
    printf("prodcut value :: %s\n", name);
    printf("max_values : %d\n", max);
    return 0;
}
