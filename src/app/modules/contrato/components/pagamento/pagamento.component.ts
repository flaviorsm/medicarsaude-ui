import { Component, Input, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { ContratoModel, PagamentoModel, PlanoModel, StatusPagamentoEnum } from '@medicar/core';
import { PagamentoService } from '@medicar/core/services';
import { Util } from '@medicar/core/shared/util';
import * as moment from 'moment';
import { jsPDF } from 'jspdf';
import { formatCurrency } from '@angular/common';
@Component({
  selector: `rts-pagamento`,
  templateUrl: `./pagamento.component.html`,
  styleUrls: [`./pagamento.component.scss`]
})
export class PagamentoComponent implements OnInit {

  @Input() contrato!: ContratoModel;

  pagamentos: PagamentoModel[] = [];
  statusPagamentoEnum = StatusPagamentoEnum;
  novaDataVenimento!: string;

  constructor(
    private pagamentoService: PagamentoService,
    @Inject(LOCALE_ID) private locale: string) {
  }

  ngOnInit(): void {
    this.novaDataVenimento = Util.formataData(new Date());
    this.pagamentos = this.contrato?.pagamentos || [];
  }

  gerarPagamento(): void {
    const novoPagamento: PagamentoModel[] = [];
    novoPagamento.push({
      codigo: Util.codigoAleatorio(),
      contrato: this.contrato?.id || ``,
      dataPagamento: undefined,
      dataVencimento: new Date(this.novaDataVenimento),
      referencia: new Date(this.novaDataVenimento),
      status: StatusPagamentoEnum.PENDENTE,
      valorPago: this.contrato?.venda.plano.valor,
    });

    this.pagamentoService.createList(novoPagamento).subscribe(result => {
      if (result && result.length > 0) {
        this.pagamentos.push(...novoPagamento);
      }
    });
  }

  efetivar(id?: string): void {
    if (id) {
      const today = moment().format(`YYYY-MM-DD`);
      this.pagamentoService.path(id, { dataPagamento: today, status: StatusPagamentoEnum.EFETIVADO })
        .subscribe(res => {
          this.pagamentos.forEach(item => {
            if (item.id === id) {
              item.status = res.status;
              item.dataPagamento = new Date(today);
            }
          });
        });
    }
  }

  cancelar(id?: string): void {
    if (id) {
      this.pagamentoService.path(id, { status: StatusPagamentoEnum.CANCELADO })
        .subscribe(res => {
          this.pagamentos.forEach(item => {
            if (item.id === id) {
              item.status = res.status;
            }
          });
        });
    }
  }

  reativar(id?: string): void {
    if (id) {
      this.pagamentoService.path(id, { status: StatusPagamentoEnum.PENDENTE })
        .subscribe(res => {
          this.pagamentos.forEach(item => {
            if (item.id === id) {
              item.status = res.status;
            }
          });
        });
    }
  }

  gerarBoleto(pag: PagamentoModel): void {
    const pdf = new jsPDF();

    pdf.setProperties({
      title: `Recido de Cobrança`,
      subject: `Contrato ` + this.contrato.codigo,
      author: `-------------`,
      keywords: `Medicar Assistência Saúde`,
      creator: `gPDF, javascript, web 2.0, ajax`
    });


    pdf.setFontSize(12);
    pdf.text(`Comprovante de Pagamento`, 75, 20);
    pdf.text(`Boleto de Cobrança`, 85, 25);

    pdf.setFontSize(18); // Tamanho da fonte
    pdf.setTextColor(150); // cor da fonte cinza claro
    pdf.text(`Codigo do contrato: ${this.contrato.codigo}`, 65, 35);

    pdf.setTextColor(0); // cor da fonte preto
    pdf.setFont(`helvetica`);
    pdf.setFontSize(10);
    pdf.text(`Beneficiário: Medicar Assistência Saúde`, 35, 45);
    pdf.text(`CNPJ: 59.355.657/0001-14`, 35, 50);
    pdf.text(`Razão social: Medicar Assistência Saúde`, 35, 55);
    pdf.text(`Referência: ${this.contrato.venda?.plano.nome}`, 35, 60);
    pdf.text(`Descrição: ${this.contrato.venda.plano.descricao}`, 110, 60);

    pdf.text(`________________________________________________________________________`, 35, 65);

    pdf.text(`Pagador: ` + this.contrato.venda?.cliente.nome, 35, 75);
    pdf.text(`CPF: ` + this.contrato.venda?.cliente.cpf, 35, 80);

    pdf.text(`________________________________________________________________________`, 35, 85);

    pdf.text(`Referência ${moment(pag.referencia).format('MM/YYYY')}`, 35, 95);
    pdf.text(`Data de validade: ${moment(pag.dataVencimento).format('DD/MM/YYYY')}`, 110, 95);

    pdf.text(`Valor: ${formatCurrency(pag.valorPago, this.locale, 'R$')}`, 35, 100);
    pdf.text(`Desconto: ${formatCurrency(0, this.locale, 'R$')}`, 110, 100);
    pdf.text(`Abatimento:  ${formatCurrency(0, this.locale, 'R$')}`, 35, 105);
    pdf.text(`Bonificação:  ${formatCurrency(0, this.locale, 'R$')}`, 110, 105);
    pdf.text(`Juros:  ${formatCurrency(0, this.locale, 'R$')}`, 35, 110);
    pdf.text(`Multa:  ${formatCurrency(0, this.locale, 'R$')}`, 110, 110);
    pdf.text(`________________________________________________________________________`, 35, 115);

    pdf.setFontSize(12);
    pdf.text(`Valor total: ${formatCurrency(pag.valorPago, this.locale, 'R$')}`, 87, 125);

    pdf.setFontSize(10);
    pdf.text(`________________________________________________________________________`, 35, 130);

    pdf.setFontSize(8);
    pdf.text(`Banco Central do Brasil estabelece o prazo de`, 75, 140);
    pdf.text(`3 dias úteis para compensar o boleto de pagamento.`, 70, 145);

    const uri = pdf.output('datauristring');
    const embed = `<embed width='100%' height='100%' src='${uri}'/>`;
    const x = window.open();
    x?.document.open();
    x?.document.write(embed);
    x?.document.close();

  }

}
