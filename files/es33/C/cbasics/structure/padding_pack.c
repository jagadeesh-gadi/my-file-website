// padding and packing the though that we can identify the sizes of the padding=8 and packings=5
// based on the struct iteams that will come outas sizes of the padding and packing 
#include<stdio.h>

struct normal {
char c;
int id;
}n;

#pragma pack(1);
struct pack {
char c;
int id;
}p;    
#pragma pack();

int main(){
printf("normal :: %zu\n",sizeof(n));
printf("packed :: %zu\n",sizeof(p));

}
