#include <stdio.h>

int main()
{
    int a,b;
    scanf("%d%d",&a,&b);
    printf("Additon assiginemt :: %d\n",a+=b);
    printf("sub_assiginemt :: %d\n",a-=b);
    printf("mul_assiginemt :: %d\n",a*=b);

    printf("div_assiginemt :: %d\n",a/=b);
    printf("modules_assiginemt :: %d\n",a%=b);
    
    return 0;
}